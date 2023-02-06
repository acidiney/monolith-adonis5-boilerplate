import {Paginate, Search} from 'app/core/ports'

export interface ListUsersUseCaseInput extends Search, Paginate {}
