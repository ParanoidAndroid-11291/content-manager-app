import axios from 'axios';

export default async (req, res) => {
  const { title, desc, link, priority, timeToFinish, id } = req.body;
  switch(req.method) {
    case "GET":
      const dataRes = await fetch("http://localhost:3001/api/resources");
      const data = await dataRes.json();
      return res.send(data);
    case "POST":
      //const { title, desc, link, priority, timeToFinish } = req.body;
      if ( !title || !desc || !link || !priority || !timeToFinish ){
        return res.status(422).send("Missing data");
      }
      try {
        const axiosRes = await axios.post("http://localhost:3001/api/resources", req.body);
        return res.send(axiosRes.data);
      } catch (e) {
        return status(422).send(e);
      }
    case "PATCH":
      //const { title, desc, link, priority, timeToFinish, id } = req.body;
      if ( !title || !desc || !link || !priority || !timeToFinish ){
        return res.status(422).send("Missing data");
      }    
      try {
        const axiosRes = await axios.patch("http://localhost:3001/api/resources/" + String(id), req.body);
        return res.send(axiosRes.data);
      } catch (e) {
        return status(422).send(e);
      }
  }
}
