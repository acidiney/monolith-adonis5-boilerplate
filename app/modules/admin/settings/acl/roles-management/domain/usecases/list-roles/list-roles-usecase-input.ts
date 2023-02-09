/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Paginate, Search} from 'app/core/ports'

export interface ListRolesUseCaseInput extends Search, Paginate {}
