// Datos de las recetas con sus ingredientes
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

// Función para navegar al checklist con la receta seleccionada
function selectRecipe(recipeId) {
    // Guardar el ID de la receta en localStorage
    localStorage.setItem('selectedRecipe', recipeId);
    // Navegar a la página de checklist
    window.location.href = '../Checklist/checklist.html';
}

// Agregar event listeners a todas las recetas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const recipeBlocks = document.querySelectorAll('.recipe-block');
    
    recipeBlocks.forEach((block, index) => {
        // Asignar ID a cada receta basado en su orden
        const recipeIds = [
            'ensalada-mediterranea',
            'tacos-portobello',
            'ramen-umami',
            'galette-manzana',
            'shakshuka-picante',
            'risotto-setas'
        ];
        
        // Hacer la receta clickeable
        block.style.cursor = 'pointer';
        block.setAttribute('data-recipe-id', recipeIds[index]);
        
        // Agregar efecto hover
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'translateY(-4px)';
            block.style.transition = 'transform 0.2s ease-in-out';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateY(0)';
        });
        
        // Agregar evento click
        block.addEventListener('click', () => {
            selectRecipe(recipeIds[index]);
        });
    });
});
