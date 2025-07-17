// Controlador - Gestiona la lógica de la aplicación
class AppController {
    constructor() {
        this.model = new AppModel();
        this.view = new AppView();
        this.bindEvents();
    }

    // Inicializar la aplicación
    init() {
        this.updateView();
        this.view.showLoading();
        
        // Simular carga inicial
        setTimeout(() => {
            this.view.hideLoading();
        }, 500);
    }

    // Vincular eventos
    bindEvents() {
        // Evento del formulario
        this.view.studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Eventos de teclado para mejorar UX
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.view.clearForm();
            }
        });

        // Evento para limpiar errores al escribir
        const inputs = this.view.studentForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.view.removeFormErrors();
            });
        });
    }

    // Manejar envío del formulario
    handleFormSubmit() {
        const formData = this.view.getFormData();
        
        // Validar datos
        const errors = this.model.validateStudent(formData);
        
        if (errors.length > 0) {
            this.view.showFormErrors(errors);
            return;
        }

        try {
            // Agregar estudiante
            const newStudent = this.model.addStudent(formData);
            
            // Actualizar vista
            this.updateView();
            this.view.clearForm();
            this.view.showSuccessMessage(`Estudiante ${newStudent.name} agregado exitosamente`);
            
            // Scroll hacia el nuevo estudiante
            setTimeout(() => {
                this.scrollToStudent(newStudent.id);
            }, 500);
            
        } catch (error) {
            this.view.showFormErrors(['Error al agregar estudiante. Por favor, intenta de nuevo.']);
            console.error('Error:', error);
        }
    }

    // Eliminar estudiante
    deleteStudent(id) {
        const student = this.model.getStudentById(id);
        
        if (!student) {
            alert('Estudiante no encontrado');
            return;
        }

        if (this.view.confirmDelete(student.name)) {
            try {
                this.model.deleteStudent(id);
                this.updateView();
                this.view.showSuccessMessage(`Estudiante ${student.name} eliminado exitosamente`);
            } catch (error) {
                alert('Error al eliminar estudiante');
                console.error('Error:', error);
            }
        }
    }

    // Actualizar toda la vista
    updateView() {
        const students = this.model.getAllStudents();
        const stats = this.model.getStats();
        
        this.view.renderStudents(students);
        this.view.updateStats(stats);
    }

    // Hacer scroll hacia un estudiante específico
    scrollToStudent(studentId) {
        const studentCard = document.querySelector(`[data-id="${studentId}"]`);
        if (studentCard) {
            studentCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Resaltar temporalmente
            studentCard.style.backgroundColor = '#e3f2fd';
            setTimeout(() => {
                studentCard.style.backgroundColor = '';
            }, 2000);
        }
    }

    // Obtener datos para exportar (funcionalidad futura)
    getExportData() {
        const students = this.model.getAllStudents();
        const stats = this.model.getStats();
        
        return {
            students,
            stats,
            exportDate: new Date().toISOString(),
            averageScore: this.model.getAverageScore()
        };
    }

    // Importar datos (funcionalidad futura)
    importData(data) {
        try {
            if (data.students && Array.isArray(data.students)) {
                // Validar cada estudiante antes de importar
                const validStudents = data.students.filter(student => {
                    const errors = this.model.validateStudent(student);
                    return errors.length === 0;
                });

                // Limpiar datos actuales y cargar nuevos
                this.model.students = validStudents;
                this.model.saveStudents();
                this.updateView();
                
                this.view.showSuccessMessage(`${validStudents.length} estudiantes importados exitosamente`);
            }
        } catch (error) {
            this.view.showFormErrors(['Error al importar datos']);
            console.error('Import error:', error);
        }
    }

    // Buscar estudiantes (funcionalidad futura)
    searchStudents(query) {
        const students = this.model.getAllStudents();
        const filtered = students.filter(student => 
            student.name.toLowerCase().includes(query.toLowerCase()) ||
            student.email.toLowerCase().includes(query.toLowerCase())
        );
        
        this.view.renderStudents(filtered);
    }

    // Ordenar estudiantes
    sortStudents(criteria = 'name', direction = 'asc') {
        const students = this.model.getAllStudents();
        
        students.sort((a, b) => {
            let valueA = a[criteria];
            let valueB = b[criteria];
            
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            if (direction === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
        
        this.view.renderStudents(students);
    }

    // Obtener estadísticas avanzadas
    getAdvancedStats() {
        const students = this.model.getAllStudents();
        
        if (students.length === 0) {
            return {
                total: 0,
                average: 0,
                highest: 0,
                lowest: 0,
                passing: 0,
                failing: 0
            };
        }

        const scores = students.map(s => s.score);
        const passing = students.filter(s => s.score >= 60).length;
        
        return {
            total: students.length,
            average: this.model.getAverageScore(),
            highest: Math.max(...scores),
            lowest: Math.min(...scores),
            passing: passing,
            failing: students.length - passing,
            passRate: ((passing / students.length) * 100).toFixed(1)
        };
    }
}

// Hacer el controlador disponible globalmente para eventos HTML
let app;
