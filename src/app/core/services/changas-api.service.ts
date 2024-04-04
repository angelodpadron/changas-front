import { Injectable } from '@angular/core';
import { ChangaOverview } from '../models/changa-overview.model';

@Injectable({
  providedIn: 'root',
})
export class ChangasAPIService {
  constructor() {}

  getChangasOverviews(): ChangaOverview[] {
    const changas: ChangaOverview[] = [
      {
        id: '1',
        title: 'Servicio de poda',
        overview: 'Elit laboris cillum et labore sunt pariatur sunt duis.',
        description:
          'Veniam dolore ad dolor in velit veniam exercitation sunt aliquip. Tempor eiusmod minim cupidatat exercitation. Consectetur ipsum eiusmod id do id nisi dolor occaecat aliqua ut. Minim incididunt enim dolor excepteur aute voluptate pariatur duis sunt do duis commodo. Duis ullamco aliquip anim proident quis nostrud laborum ex. Qui ut consequat id voluptate non esse nulla qui ullamco ea ad sint eiusmod. Ut fugiat commodo tempor incididunt pariatur officia nostrud consectetur.',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Knotwilgen_knotten.jpg/800px-Knotwilgen_knotten.jpg',
        topics: ['Jardin', 'Exterior', 'Hogar'],
        provider: {
          id: '1',
          name: 'Pepe',
          email: 'pepe@gmail.com',
          photoUrl:
            'https://uchile.cl/.imaging/default/dam/imagenes/Uchile/imagenes-noticias/151158_1_loros-argentinos-01-l_L/jcr:content.jpg',
        },
      },
      {
        id: '2',
        title: 'Trabajos de albañileria',
        overview:
          'Deserunt minim dolor velit adipisicing aliqua eiusmod duis non qui.',
        description:
          'Qui enim in adipisicing id pariatur anim irure mollit aute ullamco est ad. In duis cupidatat aliqua minim ut occaecat qui. Excepteur reprehenderit aute excepteur incididunt sint pariatur tempor pariatur nisi culpa anim. Sunt minim esse ea voluptate irure sint sunt deserunt aute exercitation occaecat qui velit magna.',
        photoUrl:
          'https://stockmansarquitectura.files.wordpress.com/2013/09/foto0159.jpg',
        topics: ['Construccion', 'Albañileria'],
        provider: {
          id: '2',
          name: 'Juan Roman Riquelme',
          email: 'juan@gmail.com',
          photoUrl:
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/740_riquelme.jpg',
        },
      },
    ];

    return changas;
  }
}
