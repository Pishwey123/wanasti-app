
export interface LoginRequest {
    email: string;
    phone: string;
    phoneCode: string;
    password: string;
    deviceToken: string;
    deviceType: string;
    deviceModel: string;
    appVersion: string;
    osVersion: string;
  }
  
  export interface LoginResponse {
    status: boolean;
    message: string;
    data?: {
      user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        // Add other user properties as needed
      };
      token?: string;
    };
  }