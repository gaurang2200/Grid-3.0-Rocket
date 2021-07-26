import { AuthDAO } from '../daos'
import { crypter } from '../helpers'

const AuthModel = {
  register,
  login,
  logout
}

async function register(body) {
  const { username, password } = body
  if (!username || !password)
    return { status: 400, isError: true, message: "All Fields Required" }
  body.password = await crypter.hash(password)
  let user = await AuthDAO.findOrCreate(body)
  if (!user) return { status: 400, isError: true, message: "User Already Exists" }
  return { status: 200, isError: false, message: "User Created Successfully" }
}


async function login(body) {
  const { username, password } = body
  if (!username || !password)
    return { status: 400, isError: true, message: "All Fields Required" }
  let user = await AuthDAO.findUser(body)
  if(!user)
    return { status: 400, isError: true, message: "User not found"}
  let c = await crypter.verify(password, user.password)
  if (!c) return { status: 403, isError: true, message: "Authorization Failed" }
  return { _id: user.id, status: 200, isError: false, message: "Logged In Successfully" }
}

async function logout() {
  return { status: 200, isError: false, message: "Logged Out Successfully" }
}


export default AuthModel