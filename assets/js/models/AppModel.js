// Modelo - Gestiona los datos de la aplicación
class AppModel {
    constructor() {
        this.students = this.loadStudents();
    }

    // Cargar estudiantes desde localStorage
    loadStudents() {
        const stored = localStorage.getItem('examStudents');
        return stored ? JSON.parse(stored) : [];
    }

    // Guardar estudiantes en localStorage
    saveStudents() {
        localStorage.setItem('examStudents', JSON.stringify(this.students));
    }

    // Agregar un nuevo estudiante
    addStudent(studentData) {
        const student = {
            id: Date.now(),
            name: studentData.name,
            email: studentData.email,
            score: parseInt(studentData.score),
            date: new Date().toLocaleDateString(),
            ...studentData
        };

        this.students.push(student);
        this.saveStudents();
        return student;
    }

    // Eliminar un estudiante
    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.saveStudents();
    }

    // Obtener todos los estudiantes
    getAllStudents() {
        return this.students;
    }

    // Obtener estadísticas
    getStats() {
        const total = this.students.length;
        const completed = this.students.filter(student => student.score >= 60).length;
        const exams = this.students.length; // Para este ejemplo, cada estudiante tiene un examen

        return {
            studentCount: total,
            examCount: exams,
            completedCount: completed
        };
    }

    // Obtener estudiante por ID
    getStudentById(id) {
        return this.students.find(student => student.id === id);
    }

    // Actualizar estudiante
    updateStudent(id, updatedData) {
        const index = this.students.findIndex(student => student.id === id);
        if (index !== -1) {
            this.students[index] = { ...this.students[index], ...updatedData };
            this.saveStudents();
            return this.students[index];
        }
        return null;
    }

    // Obtener promedio de calificaciones
    getAverageScore() {
        if (this.students.length === 0) return 0;
        const total = this.students.reduce((sum, student) => sum + student.score, 0);
        return (total / this.students.length).toFixed(2);
    }

    // Validar datos del estudiante
    validateStudent(studentData) {
        const errors = [];

        if (!studentData.name || studentData.name.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!studentData.email || !this.isValidEmail(studentData.email)) {
            errors.push('El email no es válido');
        }

        if (!studentData.score || studentData.score < 0 || studentData.score > 100) {
            errors.push('La calificación debe estar entre 0 y 100');
        }

        // Verificar si el email ya existe
        const existingStudent = this.students.find(student => 
            student.email === studentData.email
        );
        if (existingStudent) {
            errors.push('Ya existe un estudiante con este email');
        }

        return errors;
    }

    // Validar formato de email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
