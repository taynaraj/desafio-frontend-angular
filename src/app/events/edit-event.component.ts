import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { EventModel } from '../services/event.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class EditEventComponent implements OnInit {
  event!: EventModel;
  isLoading = true;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  private eventsService = inject(EventsService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.loadEvent(eventId);
    } else {
      this.toastr.error('Evento não encontrado!');
      this.router.navigate(['/events']);
    }
  }

  loadEvent(eventId: string) {
    this.eventsService.getEventById(eventId).subscribe(
      (data) => {
        this.event = data;
        this.imagePreview = data.image;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Erro ao carregar evento.');
        this.router.navigate(['/events']);
      }
    );
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.event.image = reader.result as string;
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges();
        console.log('Imagem atualizada', this.event.image);
      };

      reader.readAsDataURL(file); // Converte para Base64
    }
  }

  saveEvent() {
    if (!this.event.title || !this.event.description || !this.event.dateEvent) {
      this.toastr.error('Todos os campos são obrigatórios.');
      return;
    }

    this.eventsService.updateEvent(this.event).subscribe(
      () => {
        console.log('evento editado', this.event);
        this.toastr.success('Evento salvo com sucesso!');
        this.router.navigate(['/events']);
      },
      (error) => {
        this.toastr.error('Erro ao salvar evento.');
      }
    );
  }

  goBack() {
    this.router.navigate(['/events']);
  }
}
