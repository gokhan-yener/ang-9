import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private router: Router) {
  }

  showOps() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    });
  }

  areYouSure() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  showMessage(title: string, message: string, status: any, redirectUrl: any = false) {
    Swal.fire(title, message, status).then((result) => {
      if (result.value) {
        if (redirectUrl !== false) {
          this.router.navigateByUrl(redirectUrl);
        }
      }
    });
  }

}
