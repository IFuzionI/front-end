import { Component } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TODOapp';
  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;
  mostrarErro = false;
  descricaoNovaTarefa: string = '';

  constructor(private http: HttpClient) {
    this.apiURL = 'https://apitarefasviccenzo243515-production.up.railway.app';
    this.READ_tarefas();
  }

  CREATE_tarefa() {
    if (!this.descricaoNovaTarefa || this.descricaoNovaTarefa.trim() === '') {
      this.mostrarErro = true;
      return;
    }

    this.mostrarErro = false;
    const novaTarefa = new Tarefa(this.descricaoNovaTarefa.trim(), false);

    this.http
      .post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa)
      .subscribe((resultado) => {
        console.log(resultado);
        this.descricaoNovaTarefa = '';
        this.READ_tarefas();
      });
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa) {
    const id = tarefaASerRemovida._id;
    this.http
      .delete<Tarefa>(`${this.apiURL}/api/delete/${id}`)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

  READ_tarefas() {
    this.http
      .get<Tarefa[]>(`${this.apiURL}/api/getAll`)
      .subscribe((resultado) => (this.arrayDeTarefas = resultado));
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    if (!tarefaAserModificada.descricao || tarefaAserModificada.descricao.trim() === '') {
      this.mostrarErro = true;
      return;
    }

    this.mostrarErro = false;
    const id = tarefaAserModificada._id;

    this.http
      .patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }
}
