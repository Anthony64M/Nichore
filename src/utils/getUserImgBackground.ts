const userImgBackgroundArr = ['F56565', 'FFC328', '319795', '21243D', '8FC0EC', 'B681EB', 'FF73E9']

interface UserImgBackgroundProps {
  name: string
  username: string
}

export function getUserImgBackground({ name, username }: UserImgBackgroundProps): string {
  const fullNameLength = name.length + username.length;

  const baseColorIndex = Math.floor(Math.random() * fullNameLength)

  let colorIndex = baseColorIndex > -1 ? baseColorIndex : 0;

  if (colorIndex > userImgBackgroundArr.length - 1) {
    colorIndex = userImgBackgroundArr.length - 1
  }

  return userImgBackgroundArr[colorIndex]
}
