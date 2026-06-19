import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toPng } from 'html-to-image'
import './StudentIdCardGenerator.css'

function IdCardPreview({ card }) {
  return (
    <article className="id-card" aria-label="Generated student ID card">
      <div className="id-card__brand">
        <span>{card.campusName}</span>
        <strong>ID CARD</strong>
      </div>

      <div className="id-card__content">
        <img
          className="id-card__avatar"
          src={card.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'}
          alt={card.photoURL ? `${card.studentName} photo` : 'Default student avatar'}
        />
        <div className="id-card__details">
          <span className="id-card__label">Name</span>
          <strong>{card.studentName}</strong>
          <span className="id-card__label">Student ID</span>
          <strong>{card.studentId}</strong>
          <span className="id-card__label">Email</span>
          <strong>{card.email}</strong>
          <span className="id-card__label">Phone</span>
          <strong>{card.phone}</strong>
          <span className="id-card__label">Blood group</span>
          <strong>{card.bloodGroup}</strong>
          <span className="id-card__label">Gender</span>
          <strong>{card.gender}</strong>
          <span className="id-card__label">Campus address</span>
          <strong>{card.campusAddress}</strong>
          <span className="id-card__label">Valid until</span>
          <strong>{card.validity}</strong>
        </div>
      </div>

      {card.qrCodeDataURL ? (
        <div className="id-card__qr-wrapper">
          <span className="id-card__label">Scan to view student details</span>
          <img className="id-card__qr" src={card.qrCodeDataURL} alt="Student details QR code" />
        </div>
      ) : null}

      <div className="id-card__footer">
        <span>{card.generatedAt}</span>
        <strong>{card.campusName}</strong>
      </div>
    </article>
  )
}

export default function GeneratedIdCardPage({ user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [card, setCard] = useState(() => location.state?.generatedCard || null)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (card) return

    const saved = window.localStorage.getItem('student-id-last-card')
    if (saved) {
      try {
        setCard(JSON.parse(saved))
      } catch {
        setCard(null)
      }
    }
  }, [card])

  useEffect(() => {
    if (!card) {
      navigate('/generator', { replace: true })
    }
  }, [card, navigate])

  async function handleDownload() {
    if (!cardRef.current) {
      return
    }

    setError('')
    setDownloading(true)

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true })
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${card.studentName.replace(/\s+/g, '_')}_ID_card.png`
      link.click()
    } catch (err) {
      setError('Unable to download the card. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (!card) {
    return null
  }

  return (
    <main className="generator-page">
      <header className="generator-page__header">
        <div className="generator-page__top">
          <div>
            <h1>ID Card generated</h1>
            <p>
              Hello, <strong>{user.name}</strong>. Your ID card is ready. You can download a soft copy or update details.
            </p>
          </div>
          <button type="button" className="button button--secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="generator-page__body">
        <section className="preview-panel">
          <h2>Download soft copy</h2>
          <p>Your generated ID card is ready for download. Use the button below to save it as an image.</p>
          {error ? <p className="form-error">{error}</p> : null}
          <div className="generator-actions">
            <button type="button" className="button button--primary" onClick={handleDownload} disabled={downloading}>
              {downloading ? 'Downloading…' : 'Download soft copy'}
            </button>
            <button type="button" className="button button--secondary" onClick={() => navigate('/generator')}>
              Edit details
            </button>
          </div>
        </section>

        <section className="preview-panel">
          <h2>Generated ID card</h2>
          <div ref={cardRef} style={{ display: 'inline-block', width: '100%' }}>
            <IdCardPreview card={card} />
          </div>
        </section>
      </section>
    </main>
  )
}
