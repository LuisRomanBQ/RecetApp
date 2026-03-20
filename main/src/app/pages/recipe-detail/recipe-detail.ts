import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecetaCompleta } from '../../models/RecetaCompleta';
import { RecipeDataAgg } from '../../services/recipe-data-agg';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {
  recipe: RecetaCompleta | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private aggregator: RecipeDataAgg,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.aggregator.getRecetaCompleta(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.loading = false;
        this.cd.detectChanges();
        console.log(this.recipe)
      },
      error: () => this.router.navigate(['/app/inicio'])
    });
  }

  regresar() {
    this.router.navigate(["/app/inicio"]);
  }
}