import { Entity, Property, PrimaryKey, Collection, ManyToMany } from '@mikro-orm/core'

export interface ISocial {
    twitter: string
    instagram: string
    mail: string
}

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey()
    id!:number

    @Property()
    name!: string

    @Property()
    username!: string

    @Property()
    password!:string

    @Property()
    email!:string

    @Property({ nullable: true })
    userImage?: string

    @Property({ nullable: true })
    bio?: string

    @Property()
    joinedOn: Date = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToMany(() => User, (user: User) => user.following, { joinColumn: 'following' })
    followers = new Collection<User>(this)

    @ManyToMany(() => User, (user: User) => user.followers, { owner: true })
    following =  new Collection<User>(this)

    @Property({type:'jsonb'})
    social: ISocial = {
        twitter: '',
        instagram:'',
        mail:''
    }
}
