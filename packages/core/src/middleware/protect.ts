export async function protectApp (ctx: any, next: any) {
  try {
    await next()
  } catch (err) {
    // todo: should have a errorPool to match errcode.
    // return more infomation to client
    // statuscode not always 500
    ctx.status = 500
    ctx.body = String(`message: ${err.message}.  stack: ${err.stack}`)
  }
}

