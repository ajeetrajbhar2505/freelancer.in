import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommondataserviceService {

  constructor() { }
  


  loginWithGoogle() {
    const url = `https://long-pink-rooster-gear.cyclic.app/` + 'google';
    const width = 600;
    const height = 600;

    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=no`;

    // Open the URL in a popup
    const popup = window.open(url, '_blank', features);

    if (popup) {
      // Focus on the popup if it was successfully opened
      popup.focus();
    } else {
      // Handle cases where the popup was blocked
      alert("Please allow pop-ups for this site to log in with Google.");
    }
  }
  
}
