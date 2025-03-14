import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { EventModel } from '../services/event.module';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class EditEventComponent implements OnInit {
  private eventSubject = new BehaviorSubject<EventModel | null>(null);
  event$: Observable<EventModel | null> = this.eventSubject.asObservable();
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
    this.event$ = this.eventsService.getEventById(eventId).pipe(
      tap((data) => {
        this.eventSubject.next(data);
        this.imagePreview = data.image;
        this.isLoading = false;
      }),
      tap({
        error: () => {
          this.toastr.error('Erro ao carregar evento.');
          this.router.navigate(['/events']);
        },
      })
    );
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.eventSubject.next({ ...(this.eventSubject.value as EventModel), image: reader.result as string });
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }

  saveEvent() {
    if (!this.eventSubject.value?.title || !this.eventSubject.value?.description || !this.eventSubject.value?.dateEvent) {
      this.toastr.error('Todos os campos são obrigatórios.');
      return;
    }

    this.eventsService.updateEvent(this.eventSubject.value!).pipe(
      tap(() => {
        this.toastr.success('Evento salvo com sucesso!');
        this.router.navigate(['/events']);
      }),
      tap({
        error: () => {
          this.toastr.error('Erro ao salvar evento.');
        },
      })
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/events']);
  }
}
