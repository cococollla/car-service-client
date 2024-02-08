//Модель автомобиля полученных от бэка
export interface Car {
  id: number;
  brandName: string;
  color: string;
  price: number;
  yearRelese: string;
  shortDescription: string;
}

//Модель цвета полученного от бэка
export interface Color {
  id: number;
  name: string;
}

//Модель бренда полученного от бэка
export interface Brand {
  id: number;
  name: string;
}

//Модель для отправки данных обновления автомобиля на бэк
export interface CarDto {
  id: number;
  yearRelese: string;
  price: number;
  shortDescription: string;
  colorId: number;
  brandId: number;
}
