import { state, setState } from "../state.js";

// Add Employee
window.addEmployee = function () {
    const name = prompt("Enter Name:");
    if (!name) return;
    const newEmp = {
        id: state.allEmployees.length + 1,
        name,
        score: 50,
        present: true
    };
    const updated = [...state.allEmployees, newEmp];
    setState({ employees: updated, allEmployees: updated });
};

// Manual Update Score
window.updateScore = function () {
    const id = Number(prompt("Enter Employee ID:"));
    const newScore = prompt("Enter New Score:");
    if (!id || newScore === null) return;
    const updated = state.allEmployees.map(emp =>
        emp.id === id
            ? { ...emp, score: Number(newScore) }
            : emp
    );
    setState({ employees: updated, allEmployees: updated });
};

window.editName = function (id) {
    const name = prompt("Enter new name:");
    const updated = state.allEmployees.map(emp =>
        emp.id === id
            ? { ...emp, name: name || emp.name }
            : emp
    );
    setState({ employees: updated, allEmployees: updated });
};

window.editScore = function (id) {
    const newScore = prompt("Enter new score:");
    if (newScore === null) return;
    const updated = state.allEmployees.map(emp =>
        emp.id === id
            ? { ...emp, score: Number(newScore) }
            : emp
    );
    setState({ employees: updated, allEmployees: updated });
};

window.toggleAttendance = function (id) {
    const updated = state.allEmployees.map(emp =>
        emp.id === id
            ? { ...emp, present: !emp.present }
            : emp
    );
    setState({ employees: updated, allEmployees: updated });
};

window.searchEmployee = function (query) {
    query = query.toLowerCase();
    if (query === "") {
        setState({ employees: [...state.allEmployees] });
        return;
    }
    const filtered = state.allEmployees.filter(emp =>
        emp.name.toLowerCase().includes(query)
    );
    setState({ employees: filtered });
};

window.deleteEmployee = function (id) {
    const updatedEmployees = state.allEmployees.filter(emp => emp.id !== id);
    setState({ employees: updatedEmployees, allEmployees: updatedEmployees });
};

window.downloadPDF = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Employee Report", 14, 10);
    const tableData = state.employees.map(emp => [
        emp.id,
        emp.name,
        emp.score,
        emp.present ? "Present" : "Absent"
    ]);
    doc.autoTable({
        head: [["ID", "Name", "Score", "Attendance"]],
        body: tableData
    });
    doc.save("employees.pdf");
};