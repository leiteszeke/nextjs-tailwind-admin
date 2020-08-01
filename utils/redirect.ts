import Router from "next/router";

export const redirect = (target: string, ctx?: any) => {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    Router.replace(target);
  }
};

export default redirect;
