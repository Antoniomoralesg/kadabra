import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class ProtectedComponent implements OnInit {
  ngOnInit() {
    this.launchConfetti();
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}