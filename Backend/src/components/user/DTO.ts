export interface CreateUserDto {
    email: string,
    password: string,
    firstName: string,
    lastName?: String
    permissionFlags?: number
} 

export interface putUserDto {
    email: string,
    password: string,
    firstName: string,
    lastName?: String
    permissionFlags: number
}   

export interface PatchUserDto extends Partial<putUserDto> {}