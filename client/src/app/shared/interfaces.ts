export interface Office {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseTag {
  name: string;
}

export interface Tag extends BaseTag {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagCreate extends BaseTag {}


export interface BaseEmployee {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  officeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee extends BaseEmployee {
  id: string;
  office: Office;
  tags: Tag[];
}

export interface EmployeeCreate {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  officeId: string;
  tags: string[];
}