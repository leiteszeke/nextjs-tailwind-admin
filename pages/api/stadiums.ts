// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { getCookieFromServer } from "../../utils/cookies";
import { decode } from "js-base64";
import { responseToMeta } from "utils/request";

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200;

  const cookie = getCookieFromServer("mas1ManagementAdmin", req);
  const { token } = JSON.parse(decode(cookie));

  try {
    const request = await fetch("http://localhost:150/management/stadiums", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();

    res
      .status(status)
      .json({ data: response.data.data, meta: responseToMeta(response.data) });
  } catch (e) {
    res.status(status).send(e);
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    return getAll(req, res);
  }
};
