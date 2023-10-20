import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CodigoService {

    generarCodigo(): string {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';

        for (let i = 0; i < 10; i++) {
            const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            codigo += caracterAleatorio;
        }

        return codigo;
    }
}
