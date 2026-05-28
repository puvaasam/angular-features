import { ResolveFn, Route } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";
import { inject } from "@angular/core";
import { UserService } from "../../services/user.service";

export const userListResolver: ResolveFn<User[]> = (): Observable<User[]> => {
    const userService = inject(UserService);
    return userService.getAll();
}