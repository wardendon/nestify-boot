import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumberString } from 'class-validator'
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '邮箱', example: 'joker@gmail.com' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string
  @ApiProperty({ description: '姓名', example: '王亖' })
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string
  @ApiProperty({ description: '密码', example: '123456' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
  @ApiProperty({ description: '角色', required: false, default: 'USER' })
  @IsOptional()
  @IsString() // 可选字段,如果为null或undefined则跳过验证
  role?: string
}

// [ class-validator装饰器合集 ](https://juejin.cn/post/7132687601844092965)

// class-transformer 的 Exclude 装饰器用于排除字段，不返回给前端
//  @Exclude({ toClassOnly: true }) // 排除字段，不接收前端传递的值
// @Exclude({ toPlainOnly: true }) // 排除字段，不返回给前端，这个功能可以使用 prisma 的 select 来实现，所以我不太喜欢用这个
// 也可以看 prisma的文档如何排除字段 https://prisma.nodejs.cn/concepts/components/prisma-client/excluding-fields

// PartialType() 函数接受一个类作为参数，并创建一个新类，该类具有与原始类相同的属性，但是它们都是可选的。
// 更多映射类型，查看文档 https://nest.nodejs.cn/openapi/mapped-types#
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}

export class FindOneParams {
  @ApiProperty({ description: '用户id', example: 1 })
  @IsNumberString({}, { message: 'id必须为数字类型' })
  id: number
}