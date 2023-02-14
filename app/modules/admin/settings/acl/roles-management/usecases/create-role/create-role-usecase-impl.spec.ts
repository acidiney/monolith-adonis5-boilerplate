import {CreateRoleRepository, FindRoleByNameRepository} from './ports'
import {
  CreateRoleUseCaseImpl,
} from './create-role-usecase-impl'
import {
  PermissionAreMissingError, RoleAlreadyExistError, RoleDescriptionRequiredError,
  RoleNameRequiredError,
} from 'app/modules/admin/settings/acl/roles-management/domain/errors'
import {CreateRoleUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'
import {
  makeCreateRoleRepositoryStub,
  makeFindRoleByNameRepositoryStub,
} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/__test__'
import {EventDispatcher} from 'app/core/domain'

const makeInput = (): CreateRoleUseCaseInput => ({
  name: 'valid_role',
  description: 'valid_role_desc',
  permissions: ['valid_id_1'],
  userId: 'valid_user_id',
})

interface SutTypes {
  sut: CreateRoleUseCaseImpl
  findRoleByNameRepositoryStub: FindRoleByNameRepository,
  createRoleRepositoryStub: CreateRoleRepository
}
const makeSut = (): SutTypes => {
  const findRoleByNameRepositoryStub = makeFindRoleByNameRepositoryStub()
  const createRoleRepositoryStub = makeCreateRoleRepositoryStub()
  const sut =
    new CreateRoleUseCaseImpl(findRoleByNameRepositoryStub, createRoleRepositoryStub, EventDispatcher.getInstance())

  return {
    sut,
    findRoleByNameRepositoryStub,
    createRoleRepositoryStub,
  }
}

describe('CreateRoleUseCase', function () {
  it('should returns missing permission error', async () => {
    const { sut } = makeSut()

    const input = makeInput()
    input.permissions = []
    const output = await sut.perform(input)

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(PermissionAreMissingError)
  })

  it('should returns role name required', async () => {
    const { sut } = makeSut()

    const input = makeInput()
    input.name = ''
    const output = await sut.perform(input)

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(RoleNameRequiredError)
  })

  it('should returns role description required', async () => {
    const { sut } = makeSut()

    const input = makeInput()
    input.description = ''

    const output = await sut.perform(input)

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(RoleDescriptionRequiredError)
  })

  it('should returns role name already exists', async () => {
    const {sut} = makeSut()

    const output = await sut.perform(makeInput())

    expect(output.isLeft()).toBeTruthy()
    expect(output.value).toBeInstanceOf(RoleAlreadyExistError)
  })

  it('should returns true when succeed', async () => {
    const { sut, findRoleByNameRepositoryStub } = makeSut()

    jest.spyOn(findRoleByNameRepositoryStub, 'findByName')
      .mockResolvedValueOnce(Promise.resolve(undefined))

    const output = await sut.perform(makeInput())

    expect(output.isRight()).toBeTruthy()
  })
})
