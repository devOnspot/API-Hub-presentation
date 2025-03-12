/**
 * Script simplificado para a timeline do slide 11
 */

// Objeto com os detalhes de cada mês
const timelineMonths = {
    nov: {
        title: "Project Start",
        items: [
            "Analysis of FareHarbor API documentation",
            "Project scope definition",
            "Study of OctoTravel and FareHarbor documentation",
            "Initial architecture design",
            "Creation of first integration prototypes"
        ]
    },
    dez: {
        title: "Data Modeling",
        items: [
            "Creation of unified data model",
            "Development of bidirectional converters",
            "Definition of storage strategies",
            "Creation and configuration of development pipeline with GitHub",
            "Configuration of GitHub Actions for CI/CD"
        ]
    },
    jan: {
        title: "Integration Development",
        items: [
            "Implementation of listing endpoints",
            "Development of availability system",
            "Configuration of Linux server (Debian) to host the API",
            "Integration tests with sandbox environment",
            "Import of Califun data to Supabase for performance gain"
        ]
    },
    fev: {
        title: "Booking System",
        items: [
            "Development of complete booking flow",
            "Implementation of error handling system",
            "Creation of authentication mechanism via API Key",
            "Integration tests of the complete flow",
            "Initial optimization of production environment"
        ]
    },
    mar: {
        title: "Tests and Refinements",
        items: [
            "End-to-end integration tests",
            "Performance adjustments",
            "Fixing identified bugs",
            "Preparation for production launch",
            "Creation of integrated system documentation"
        ]
    },
    abr: {
        title: "Optimization and Caching",
        items: [
            "Implementation of caching strategies",
            "Optimization of queries and transfers",
            "Response time reduction",
            "Adjustments for higher traffic volumes",
            "Performance monitoring"
        ]
    },
    mai: {
        title: "Provider Expansion",
        items: [
            "Integration with new experience providers",
            "Model adaptation to support multiple sources",
            "Expansion of product catalog",
            "Cross-compatibility tests",
            "System scalability improvements"
        ]
    },
    jun: {
        title: "Analytics and Monitoring",
        items: [
            "Implementation of reporting system",
            "Conversion tracking by provider",
            "Real-time performance monitoring",
            "KPI tracking dashboards",
            "Final adjustments based on usage metrics"
        ]
    }
};

/**
 * Mostra os detalhes de um mês específico
 */
function showTimelineDetails(month) {
    const details = timelineMonths[month];
    const container = document.getElementById('timelineDetailsContainer');
    
    // Remove classe 'active' de todos os nós
    document.querySelectorAll('.timeline-node').forEach(node => {
        node.classList.remove('active');
    });
    
    // Adiciona classe 'active' ao nó selecionado
    const selectedNode = document.querySelector(`.timeline-node[onclick*="${month}"]`);
    if (selectedNode) {
        selectedNode.classList.add('active');
    }
    
    // Cria o conteúdo HTML
    let html = `
        <div class="timeline-details-content fade-in">
            <h4>${details.title}</h4>
            <ul>
    `;
    
    // Adiciona os itens
    details.items.forEach(item => {
        html += `<li>${item}</li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    // Atualiza o container
    container.innerHTML = html;
}

/**
 * Inicializa a timeline quando o slide é carregado
 */
function initializeTimeline() {
    console.log("Inicializando timeline simplificada...");
    
    // Mostra detalhes do mês atual por padrão
    showTimelineDetails('mar');
}

// Exporta as funções para o escopo global
window.showTimelineDetails = showTimelineDetails;
window.initializeTimeline = initializeTimeline;

// Inicializa quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
});