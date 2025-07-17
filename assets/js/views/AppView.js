// Vista - Gestiona la interfaz de usuario
class AppView {
    constructor() {
        this.studentForm = document.getElementById('studentForm');
        this.studentsList = document.getElementById('studentsList');
        this.studentCountEl = document.getElementById('studentCount');
        this.examCountEl = document.getElementById('examCount');
        this.completedCountEl = document.getElementById('completedCount');
        
        this.initializeEvents();
    }

    // Inicializar eventos de la vista
    initializeEvents() {
        // Animaciones al cargar
        this.animateElements();
    }

    // Animaciones de entrada
    animateElements() {
        const elements = document.querySelectorAll('.stat-card, .form-section, .data-section');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 100);
        });
    }

    // Actualizar estadísticas en el dashboard
    updateStats(stats) {
        this.animateCounter(this.studentCountEl, stats.studentCount);
        this.animateCounter(this.examCountEl, stats.examCount);
        this.animateCounter(this.completedCountEl, stats.completedCount);
    }

    // Animación de contador
    animateCounter(element, target) {
        const start = parseInt(element.textContent) || 0;
        const increment = target > start ? 1 : -1;
        const duration = 500;
        const steps = Math.abs(target - start);
        const stepTime = duration / steps;

        let current = start;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === target) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Renderizar la lista de estudiantes
    renderStudents(students) {
        if (students.length === 0) {
            this.studentsList.innerHTML = this.renderEmptyState();
            return;
        }

        const studentsHTML = students.map(student => this.renderStudentCard(student)).join('');
        this.studentsList.innerHTML = studentsHTML;
        
        // Agregar animación a las tarjetas
        const cards = this.studentsList.querySelectorAll('.student-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }

    // Renderizar tarjeta individual de estudiante
    renderStudentCard(student) {
        const scoreClass = this.getScoreClass(student.score);
        
        return `
            <div class="student-card" data-id="${student.id}">
                <div class="student-header">
                    <div class="student-name">
                        <i class="fas fa-user"></i> ${student.name}
                    </div>
                    <div class="student-score ${scoreClass}">
                        ${student.score}%
                    </div>
                </div>
                <div class="student-email">
                    <i class="fas fa-envelope"></i> ${student.email}
                </div>
                <div class="student-date">
                    <i class="fas fa-calendar"></i> ${student.date}
                </div>
                <div class="student-actions">
                    <button class="btn btn-danger btn-sm" onclick="app.deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    // Obtener clase CSS según la calificación
    getScoreClass(score) {
        if (score >= 90) return 'score-excellent';
        if (score >= 80) return 'score-good';
        if (score >= 60) return 'score-regular';
        return 'score-poor';
    }

    // Renderizar estado vacío
    renderEmptyState() {
        return `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No hay estudiantes registrados</h3>
                <p>Agrega tu primer estudiante usando el formulario de arriba</p>
            </div>
        `;
    }

    // Obtener datos del formulario
    getFormData() {
        return {
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            score: document.getElementById('examScore').value
        };
    }

    // Limpiar formulario
    clearForm() {
        this.studentForm.reset();
        this.removeFormErrors();
    }

    // Mostrar errores de validación
    showFormErrors(errors) {
        this.removeFormErrors();
        
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error}`;
            this.studentForm.appendChild(errorDiv);
        });

        // Agregar estilos CSS para errores si no existen
        if (!document.querySelector('.form-error-styles')) {
            const style = document.createElement('style');
            style.className = 'form-error-styles';
            style.textContent = `
                .form-error {
                    background: #fee;
                    color: #c33;
                    padding: 0.5rem;
                    border-radius: 5px;
                    margin-top: 0.5rem;
                    border: 1px solid #fcc;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: shake 0.5s ease-in-out;
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Remover errores del formulario
    removeFormErrors() {
        const errors = this.studentForm.querySelectorAll('.form-error');
        errors.forEach(error => error.remove());
    }

    // Mostrar mensaje de éxito
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        this.studentForm.appendChild(successDiv);
        
        // Agregar estilos CSS para éxito si no existen
        if (!document.querySelector('.success-message-styles')) {
            const style = document.createElement('style');
            style.className = 'success-message-styles';
            style.textContent = `
                .success-message {
                    background: #efe;
                    color: #3c3;
                    padding: 0.5rem;
                    border-radius: 5px;
                    margin-top: 0.5rem;
                    border: 1px solid #cfc;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: fadeIn 0.5s ease-out;
                }
            `;
            document.head.appendChild(style);
        }

        // Remover mensaje después de 3 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Mostrar estado de carga
    showLoading() {
        document.body.classList.add('loading');
    }

    // Ocultar estado de carga
    hideLoading() {
        document.body.classList.remove('loading');
    }

    // Confirmar eliminación
    confirmDelete(studentName) {
        return confirm(`¿Estás seguro de que quieres eliminar a ${studentName}?`);
    }
}
