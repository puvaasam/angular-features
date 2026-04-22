import { ChangeDetectionStrategy, Component, resource } from '@angular/core';

interface GalleryImage {
  id: number;
  title: string;
  url: string;
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {
  

  protected readonly galleryResource = resource<GalleryImage[], unknown>({
    loader: async () => {
      const response = await fetch('/mock/images.json');
      if (!response.ok) throw new Error('Failed to load images');
      return (await response.json()) as GalleryImage[];
    }
  })
}
