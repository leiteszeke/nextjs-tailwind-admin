// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  let status = 200;

  try {
    const request = await fetch("http://localhost:150/management/login", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();

    status = request.status;

    if (response.error) {
      throw response;
    }

    res.status(status);
    res.send(response);
  } catch (e) {
    res.status(status);
    res.send(e);
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "POST") {
    return login(req, res);
  }
};
