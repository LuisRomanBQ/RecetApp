import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {}
