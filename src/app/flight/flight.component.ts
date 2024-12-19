import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {
  flights: any[] = [];
  filteredFlights: any[] = [];
  departure = '';
  destination = '';
  date = '';
  sortOrder: string = "";
  isView = false
  isDetailsView=false
  viewDetails:any = {
    id: '',
    airline: '',
    logo: '',
    flightNumber: '',
    departure: { place: '', date: '', time: '' },
    destination: { place: '', date: '', time: '' },
    duration: '',
    price: 0,
  };

  constructor(private http: HttpClient) {}

  onOpenView(){
    this.isView = !this.isView
  }

  onCloseView(){
    this.isView = !this.isView
  }

  onOpenDetails(data:any){
    this.isDetailsView = !this.isDetailsView
    console.log(data)
    this.viewDetails = data
  }

  onCloseDetails(){
    this.isDetailsView = !this.isDetailsView
    this.viewDetails = {
      id: '',
      airline: '',
      logo: '',
      flightNumber: '',
      departure: { place: '', date: '', time: '' },
      destination: { place: '', date: '', time: '' },
      duration: '',
      price: 0,
    };;
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/flights').subscribe((data) => {
      this.flights = data;
      this.filteredFlights = data;
      this.sortFlights();
    });
  }

  onSearch() {
    const filters = {
      departure: this.departure,
      destination: this.destination,
      date: this.date ? new Date(this.date).toISOString().split('T')[0] : '',
    };
  
    this.filteredFlights = this.flights.filter(flight => {
      const flightDate = new Date(flight.departure.date).toISOString().split('T')[0];
      return (
        (!filters.departure || flight.departure.place.toLowerCase().includes(filters.departure.toLowerCase())) &&
        (!filters.destination || flight.destination.toLowerCase().includes(filters.destination.toLowerCase())) &&
        (!filters.date || flightDate === filters.date)
      );
    });
    this.onCloseView()
  }
  
  clearFilter(){
    this.departure = '';
    this.destination = '';
    this.date = '';
    this.onSearch() 
  }

  sortFlights() {
    if (this.sortOrder === 'highest') {
      this.filteredFlights.sort((a, b) => b.price - a.price);
    } else {
      this.filteredFlights.sort((a, b) => a.price - b.price);
    }
  }
}