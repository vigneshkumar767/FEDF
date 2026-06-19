import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import authService from '../services/authService.js'
import './StudentIdCardGenerator.css'

export default function StudentIdCardGenerator({ user, onLogout, onUpdateUser }) {
  const [formData, setFormData] = useState({
    studentName: user?.details?.studentName || '',
    studentId: user?.details?.studentId || '',
    email: user?.details?.email || '',
    phone: user?.details?.phone || '',
    bloodGroup: user?.details?.bloodGroup || 'A+',
    gender: user?.details?.gender || 'Male',
    address: user?.details?.address || '',
    campusName: user?.details?.campusName || '',
    campusAddress: user?.details?.campusAddress || '',
    validity: user?.details?.validity || '',
    photoURL: user?.details?.photoURL || '',
  })
  const [error, setError] = useState('')
  const [photoUploadError, setPhotoUploadError] = useState('')
  const [photoInputKey, setPhotoInputKey] = useState(Date.now())
  const [isGenerating, setIsGenerating] = useState(false)
  const navigate = useNavigate()

  const isValid =
    formData.studentName.trim() &&
    formData.studentId.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.bloodGroup.trim() &&
    formData.address.trim() &&
    formData.campusName.trim() &&
    formData.campusAddress.trim() &&
    formData.validity.trim()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoUploadError('Please select an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormData((current) => ({
        ...current,
        photoURL: reader.result,
      }))
      setPhotoUploadError('')
    }
    reader.onerror = () => {
      setPhotoUploadError('Unable to read the selected photo.')
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isValid) {
      setError('Full name, student ID, address, campus name, campus address, and validity are required.')
      return
    }

    setError('')
    setIsGenerating(true)

    try {
      const cardData = {
        ...formData,
        generatedAt: new Date().toLocaleString(),
        accountName: user.name,
      }

      const qrText = `Full Name: ${cardData.studentName}\nStudent ID: ${cardData.studentId}\nEmail: ${cardData.email}\nPhone: ${cardData.phone}\nBlood group: ${cardData.bloodGroup}\nGender: ${cardData.gender}\nAddress: ${cardData.address}\nCampus: ${cardData.campusName}\nCampus Address: ${cardData.campusAddress}\nValid until: ${cardData.validity}`
      const qrCodeDataURL = await QRCode.toDataURL(qrText, { margin: 1, scale: 6 })
      const generatedCard = { ...cardData, qrCodeDataURL }

      const updatedUser = authService.updateStudentDetails(user.name, generatedCard)
      onUpdateUser(updatedUser)
      window.localStorage.setItem('student-id-last-card', JSON.stringify(generatedCard))
      navigate('/generated', { state: { generatedCard } })
    } catch (err) {
      setError('Unable to create the ID card. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  function handleReset() {
    setFormData({
      studentName: user?.details?.studentName || '',
      studentId: user?.details?.studentId || '',
      email: user?.details?.email || '',
      phone: user?.details?.phone || '',
      bloodGroup: user?.details?.bloodGroup || 'A+',
      gender: user?.details?.gender || 'Male',
      address: user?.details?.address || '',
      campusName: user?.details?.campusName || '',
      campusAddress: user?.details?.campusAddress || '',
      validity: user?.details?.validity || '',
      photoURL: user?.details?.photoURL || '',
    })
    setError('')
    setPhotoUploadError('')
    setPhotoInputKey(Date.now())
  }

  return (
    <main className="generator-page">
      <header className="generator-page__header">
        <div className="generator-page__top">
          <div>
            <h1>Student ID Card Generator</h1>
            <p>Enter the student details below to create an ID card on the next page.</p>
          </div>
          <button type="button" className="button button--secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="generator-page__body">
        <form className="generator-form" onSubmit={handleSubmit} noValidate>
          <div className="generator-form__section">
            <h2>Student details</h2>
            <div className="generator-form__grid">
              <label>
                Full name
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
              </label>
              <label>
                Student ID
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="S1234567"
                  required
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 012 345"
                  required
                />
              </label>
              <label>
                Blood group
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </label>
              <label>
                Gender
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Valid until
                <input
                  type="date"
                  name="validity"
                  value={formData.validity}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="generator-form__full-width">
                Address
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, City"
                  required
                />
              </label>
              <label>
                Campus name
                <input
                  type="text"
                  name="campusName"
                  value={formData.campusName}
                  onChange={handleChange}
                  placeholder="Greenfield University"
                  required
                />
              </label>
              <label>
                Campus address
                <input
                  type="text"
                  name="campusAddress"
                  value={formData.campusAddress}
                  onChange={handleChange}
                  placeholder="10 College Avenue, City"
                  required
                />
              </label>
              <label>
                Upload photo
                <input key={photoInputKey} type="file" accept="image/*" onChange={handlePhotoUpload} />
                {photoUploadError ? <span className="form-error">{photoUploadError}</span> : null}
              </label>
              <label className="generator-form__full-width">
                Photo URL
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                />
                <small>Uploading a photo here will override the current profile image.</small>
              </label>
            </div>
          </div>

          <aside className="generator-form__sidebar" aria-live="polite">
            <div className="status-card">
              <p>
                Status: <strong>{isGenerating ? 'Generating...' : 'Ready to create'}</strong>
              </p>
              <p>
                Account: <strong>{user.name}</strong>
              </p>
            </div>
            <div className="generator-actions">
              <button type="submit" className="button button--primary" disabled={!isValid || isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate ID card'}
              </button>
              <button type="button" className="button button--secondary" onClick={handleReset} disabled={isGenerating}>
                Reset form
              </button>
            </div>
            {error ? <p className="form-error">{error}</p> : null}
          </aside>
        </form>

        <section className="preview-panel">
          <h2>Next step</h2>
          <p>Once submitted, your ID card will open on a separate page where you can download a soft copy.</p>
          <div className="id-summary">
            <p>Required details:</p>
            <ul>
              <li>Full name</li>
              <li>Student ID</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Blood group</li>
              <li>Gender</li>
              <li>Address</li>
              <li>Campus name</li>
              <li>Campus address</li>
              <li>Validity date</li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  )
}