// script.js - Validación de carnets por ID y renderizado dinámico

document.addEventListener('DOMContentLoaded', () => {
    // Generar capa fija de burbujas aleatorias en el fondo
    const createBubbleLayer = (count = 12) => {
        const existing = document.getElementById('bubble-layer');
        if (existing) existing.remove();
        const layer = document.createElement('div');
        layer.id = 'bubble-layer';

        const colors = [
            'rgba(59,130,246,', // azul
            'rgba(99,102,241,', // morado
            'rgba(34,197,94,' // verde
        ];

        for (let i = 0; i < count; i++) {
            const b = document.createElement('div');
            b.className = 'bubble ' + (Math.random() > 0.5 ? 'glass' : 'soft');

            const size = Math.floor(Math.random() * 200) + 60; // 60 - 260px
            const left = Math.random() * 100; // percent
            const top = Math.random() * 100; // percent
            const opacity = (Math.random() * 0.18 + 0.04).toFixed(3); // 0.04 - 0.22
            const color = colors[Math.floor(Math.random() * colors.length)];

            b.style.width = `${size}px`;
            b.style.height = `${size}px`;
            b.style.left = `${left}%`;
            b.style.top = `${top}%`;
            b.style.opacity = opacity;
            // añadir un sutil anillo de color usando box-shadow con color aleatorio
            b.style.boxShadow = `0 8px 30px ${color}${(opacity / 1.6)})`;

            layer.appendChild(b);
        }

        document.body.appendChild(layer);
    };

    // crear al cargar y recrear si se redimensiona (para adaptarse a viewport)
    createBubbleLayer(14);
    window.addEventListener('resize', () => createBubbleLayer(14));

    const councilMembers = [
        {
            id: 'presidente',
            name: 'Gabriel Efrén Mora Foyain',
            role: 'Presidente del Gobierno Estudiantil',
            rank: 'Presidente',
            ci: '030S3290003',
            period: '2026 - 2027',
            expiry: 'Julio / 2027',
            image: 'assets/students/Foyain-r.png'
        },
        {
            id: 'vicepresidenta',
            name: 'Maritza Emperatriz Chichande Morán',
            role: 'Vicepresidenta del Gobierno Estudiantil',
            rank: 'Vicepresidenta',
            ci: '030S3290004',
            period: '2026 - 2027',
            expiry: 'Julio / 2027',
            image: 'assets/students/Chichande-r.png'
        },
        {
            id: 'secretaria',
            name: 'Mayerly Zayleth Vallejos Bravo',
            role: 'Secretaria del Gobierno Estudiantil',
            rank: 'Secretaria',
            ci: '030S3290005',
            period: '2026 - 2027',
            expiry: 'Julio / 2027',
            image: 'assets/students/Vallejos-r.png'
        },
        {
            id: 'tesorero',
            name: 'Adrián Jesús Figueroa Freire',
            role: 'Tesorero del Gobierno Estudiantil',
            rank: 'Tesorero',
            ci: '030S3290006',
            period: '2026 - 2027',
            expiry: 'Julio / 2027',
            image: 'assets/students/Figueroa-r.png'
        },
        {
            id: 'vocal-principal',
            name: 'Daenerys Valentina Montes Franco',
            role: 'Vocal Principal',
            rank: 'Vocal Principal',
            ci: '030S3290007',
            period: '2026 - 2027',
            expiry: 'Julio / 2027',
            image: 'assets/students/Montes-r.png'
        },
        {
            id: 'vocal-suplente',
            name: 'Sneyder Alfredo Martínez Luna',
            role: 'Vocal Suplente',
            rank: 'Vocal Suplente',
            ci: '030S3290008',
            period: '2026 - 2027',
            expiry: 'Julio / 2027',
            image: 'assets/students/Martinez-r.png'
        }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('id');
    const studentGrid = document.getElementById('student-grid');

    const createStudentCard = (member) => {
        const card = document.createElement('div');
        card.className = 'student-card';

        if (targetId && (member.id === targetId || member.ci === targetId)) {
            card.classList.add('highlight');
        }

        card.innerHTML = `
            <div class="student-header">
                <img src="assets/logo.png" alt="Logo" class="student-logo">
                <div>
                    <span class="student-school-name">Escuela de Educación Básica Francisco Illingworth Icaza</span>
                    <span class="student-school-sub">Carnet Institucional</span>
                </div>
            </div>
            <div class="student-body">
                <div class="student-photo" style="background-image: url('${member.image || 'assets/students/default.jpg'}');"></div>
                <div class="student-info">
                    <span class="student-rank">${member.rank}</span>
                    <h3>${member.name}</h3>
                    <div class="student-details">
                        <p><strong>Cargo:</strong> ${member.role}</p>
                        <p><strong>Período:</strong> ${member.period}</p>
                        <p><strong>Vencimiento:</strong> ${member.expiry}</p>
                    </div>
                </div>
            </div>
            <p class="disclaimer card-disclaimer">Válida sólo para uso escolar</p>
        `;

        return card;
    };

    if (targetId) {
        const matchedMember = councilMembers.find(member => member.id === targetId || member.ci === targetId);
        if (matchedMember) {
            studentGrid.appendChild(createStudentCard(matchedMember));
        } else {
            studentGrid.innerHTML = '<p style="text-align:center; color:#666; padding:40px;">No se encontró el miembro del consejo.</p>';
        }
    } else {
        councilMembers.forEach(member => studentGrid.appendChild(createStudentCard(member)));
    }
});