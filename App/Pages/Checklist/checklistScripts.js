// Datos de las recetas (mismo objeto que en homeScripts.js)
const recipes = {
    'ensalada-mediterranea': {
        name: 'Ensalada Mediterránea',
        author: 'Laura Campos',
        difficulty: 'Fácil',
        ingredients: [
            'Lechuga romana (1 unidad)',
            'Tomates cherry (200g)',
            'Pepino (1 unidad)',
            'Queso feta (150g)',
            'Aceitunas negras (100g)',
            'Cebolla morada (1/2 unidad)',
            'Aceite de oliva (3 cucharadas)',
            'Jugo de limón (2 cucharadas)',
            'Orégano seco (1 cucharadita)',
            'Sal y pimienta al gusto'
        ]
    },
    'tacos-portobello': {
        name: 'Tacos de Portobello',
        author: 'Chef Mateo',
        difficulty: 'Media',
        ingredients: [
            'Hongos portobello (4 unidades)',
            'Tortillas de maíz (8 unidades)',
            'Aguacate (2 unidades)',
            'Cilantro fresco (1 manojo)',
            'Cebolla blanca (1 unidad)',
            'Limón (2 unidades)',
            'Salsa roja (200ml)',
            'Aceite de oliva (2 cucharadas)',
            'Ajo en polvo (1 cucharadita)',
            'Comino (1 cucharadita)',
            'Sal al gusto'
        ]
    },
    'ramen-umami': {
        name: 'Ramen Umami',
        author: 'Akira Sato',
        difficulty: 'Difícil',
        ingredients: [
            'Fideos ramen (400g)',
            'Caldo de pollo (1.5 litros)',
            'Huevos (4 unidades)',
            'Cerdo chashu (300g)',
            'Cebollín (4 tallos)',
            'Alga nori (4 hojas)',
            'Brotes de bambú (150g)',
            'Miso blanco (2 cucharadas)',
            'Salsa de soya (3 cucharadas)',
            'Jengibre fresco (2cm)',
            'Ajo (4 dientes)',
            'Aceite de sésamo (1 cucharada)'
        ]
    },
    'galette-manzana': {
        name: 'Galette de Manzana',
        author: 'Ana Karla',
        difficulty: 'Media',
        ingredients: [
            'Harina de trigo (250g)',
            'Mantequilla fría (125g)',
            'Agua helada (4 cucharadas)',
            'Manzanas (4 unidades)',
            'Azúcar (80g)',
            'Canela en polvo (1 cucharadita)',
            'Huevo (1 unidad)',
            'Almendras laminadas (50g)',
            'Sal (1 pizca)',
            'Azúcar glass para decorar'
        ]
    },
    'shakshuka-picante': {
        name: 'Shakshuka Picante',
        author: 'Samir Abdel',
        difficulty: 'Fácil',
        ingredients: [
            'Tomates maduros (800g)',
            'Huevos (6 unidades)',
            'Pimientos rojos (2 unidades)',
            'Cebolla (1 unidad)',
            'Ajo (4 dientes)',
            'Chile jalapeño (1 unidad)',
            'Comino (1 cucharadita)',
            'Pimentón (1 cucharadita)',
            'Cilantro fresco (1 manojo)',
            'Aceite de oliva (3 cucharadas)',
            'Sal y pimienta al gusto'
        ]
    },
    'risotto-setas': {
        name: 'Risotto de Setas',
        author: 'Isabella Rossi',
        difficulty: 'Difícil',
        ingredients: [
            'Arroz arborio (300g)',
            'Setas variadas (400g)',
            'Caldo de vegetales (1 litro)',
            'Vino blanco (150ml)',
            'Cebolla (1 unidad)',
            'Ajo (3 dientes)',
            'Queso parmesano (100g)',
            'Mantequilla (50g)',
            'Aceite de oliva (3 cucharadas)',
            'Perejil fresco (1 manojo)',
            'Sal y pimienta al gusto'
        ]
    }
};

// Función para obtener el estado de los checkboxes guardados
function getCheckedState(recipeId) {
    const saved = localStorage.getItem(`checklist-${recipeId}`);
    return saved ? JSON.parse(saved) : [];
}

// Función para guardar el estado de los checkboxes
function saveCheckedState(recipeId, checkedIndices) {
    localStorage.setItem(`checklist-${recipeId}`, JSON.stringify(checkedIndices));
}

// Función para actualizar las estadísticas del progreso
function updateProgress(recipeId, totalIngredients) {
    const checkedState = getCheckedState(recipeId);
    const checkedCount = checkedState.length;
    const percentage = Math.round((checkedCount / totalIngredients) * 100);
    
    // Actualizar texto
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.innerHTML = `<strong>${checkedCount}</strong> de <strong>${totalIngredients}</strong> ingredientes`;
    }
    
    // Actualizar barra de progreso
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// Función para renderizar la información de la receta
function renderRecipeInfo(recipe) {
    const recipeInfoSection = document.querySelector('.recipe-info');
    
    if (recipeInfoSection) {
        const difficultyClass = recipe.difficulty.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        recipeInfoSection.innerHTML = `
            <h2>${recipe.name}</h2>
            <div class="recipe-meta">
                <p class="recipe-author">por ${recipe.author}</p>
                <span class="difficulty ${difficultyClass}">${recipe.difficulty}</span>
            </div>
        `;
    }
}

// Función para renderizar la lista de ingredientes
function renderIngredients(recipeId, recipe) {
    const ingredientsList = document.querySelector('.ingredients-list');
    
    if (!ingredientsList) return;
    
    // Obtener estado guardado
    const checkedState = getCheckedState(recipeId);
    
    // Limpiar lista
    ingredientsList.innerHTML = '';
    
    // Crear un checkbox por cada ingrediente
    recipe.ingredients.forEach((ingredient, index) => {
        const isChecked = checkedState.includes(index);
        
        const itemDiv = document.createElement('div');
        itemDiv.className = `ingredient-item ${isChecked ? 'checked' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `ingredient-${index}`;
        checkbox.checked = isChecked;
        
        const label = document.createElement('label');
        label.htmlFor = `ingredient-${index}`;
        label.textContent = ingredient;
        
        // Event listener para manejar el cambio de estado
        checkbox.addEventListener('change', (e) => {
            const currentState = getCheckedState(recipeId);
            
            if (e.target.checked) {
                // Agregar al estado
                if (!currentState.includes(index)) {
                    currentState.push(index);
                }
                itemDiv.classList.add('checked');
            } else {
                // Remover del estado
                const indexToRemove = currentState.indexOf(index);
                if (indexToRemove > -1) {
                    currentState.splice(indexToRemove, 1);
                }
                itemDiv.classList.remove('checked');
            }
            
            // Guardar nuevo estado
            saveCheckedState(recipeId, currentState);
            
            // Actualizar progreso
            updateProgress(recipeId, recipe.ingredients.length);
        });
        
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        ingredientsList.appendChild(itemDiv);
    });
    
    // Actualizar progreso inicial
    updateProgress(recipeId, recipe.ingredients.length);
}

// Función para mostrar estado vacío si no hay receta seleccionada
function showEmptyState() {
    const container = document.querySelector('.checklist-container');
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No hay receta seleccionada</h3>
                <p>Por favor, selecciona una receta desde la página de inicio.</p>
                <a href="../Home/home.html" class="back-button">
                    ← Volver al inicio
                </a>
            </div>
        `;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Obtener ID de la receta seleccionada
    const selectedRecipeId = localStorage.getItem('selectedRecipe');
    
    if (!selectedRecipeId || !recipes[selectedRecipeId]) {
        showEmptyState();
        return;
    }
    
    const recipe = recipes[selectedRecipeId];
    
    // Renderizar información de la receta
    renderRecipeInfo(recipe);
    
    // Renderizar lista de ingredientes
    renderIngredients(selectedRecipeId, recipe);
});
