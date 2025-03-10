// Tool categories and their tools
const toolCategories = {
    'image-tools': {
        title: 'Image Tools',
        icon: 'fas fa-image',
        tools: [
            { name: 'Image to PNG Converter', path: 'tools/image-to-png.html', description: 'Convert images to PNG format' },
            { name: 'Image to JPG Converter', path: 'tools/image-to-jpg.html', description: 'Convert images to JPG format' },
            { name: 'Image Resizer', path: 'tools/image-resizer.html', description: 'Resize images to desired dimensions' },
            { name: 'Image Compressor', path: 'tools/image-compressor.html', description: 'Compress images to reduce file size' },
            { name: 'Image Cropper', path: 'tools/image-cropper.html', description: 'Crop images to desired aspect ratio' }
        ]
    },
    'seo-tools': {
        title: 'SEO Tools',
        icon: 'fas fa-search',
        tools: [
            { name: 'Meta Tag Generator', path: 'tools/meta-tag-generator.html', description: 'Generate SEO meta tags' },
            { name: 'Keyword Density Checker', path: 'tools/keyword-density.html', description: 'Check keyword density in text' },
            { name: 'Sitemap Generator', path: 'tools/sitemap-generator.html', description: 'Generate XML sitemaps' },
            { name: 'Robots.txt Generator', path: 'tools/robots-txt-generator.html', description: 'Create robots.txt files' },
            { name: 'Google Index Checker', path: 'tools/google-index-checker.html', description: 'Check Google indexing status' }
        ]
    }
    // Add more categories here...
};

// Load header and footer
async function loadComponents() {
    try {
        const headerResponse = await fetch('components/header.html');
        const footerResponse = await fetch('components/footer.html');
        
        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();
        
        document.getElementById('header-placeholder').innerHTML = headerHtml;
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
        
        // Initialize search functionality after header is loaded
        initializeSearch();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    const headerSearch = document.getElementById('headerSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (headerSearch) {
        headerSearch.addEventListener('input', handleSearch);
    }
}

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const toolsGrid = document.getElementById('toolsGrid');
    
    // Clear existing content
    toolsGrid.innerHTML = '';
    
    // Filter and display matching tools
    Object.entries(toolCategories).forEach(([categoryId, category]) => {
        const matchingTools = category.tools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) || 
            tool.description.toLowerCase().includes(searchTerm)
        );
        
        if (matchingTools.length > 0) {
            const categorySection = createCategorySection(categoryId, category.title, category.icon, matchingTools);
            toolsGrid.appendChild(categorySection);
        }
    });
}

// Create category section
function createCategorySection(categoryId, title, icon, tools) {
    const section = document.createElement('div');
    section.className = 'col-12 category-section';
    section.id = categoryId;
    
    section.innerHTML = `
        <h2 class="category-title">
            <i class="${icon} me-2"></i>${title}
        </h2>
        <div class="row g-4">
            ${tools.map(tool => createToolCard(tool)).join('')}
        </div>
    `;
    
    return section;
}

// Create tool card
function createToolCard(tool) {
    return `
        <div class="col-md-4 col-lg-3">
            <div class="card tool-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.description}</p>
                    <a href="${tool.path}" class="btn btn-primary">Use Tool</a>
                </div>
            </div>
        </div>
    `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    handleSearch({ target: { value: '' } }); // Display all tools initially
}); 