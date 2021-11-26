import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
  //duration: '1s',
  insecureSkipTLSVerify: true,
  httpDebug: 'full'
};

const PROTOCOL='http';
const BASE_URL=`${(__ENV.TL_HOST | 'localhost:3000')}/api/v1`;

const login = function(user,pass) {
  const BASIC_AUTH='etsiiApi:laApiDeLaETSIIDaLache';
  const LOGIN_WS='/auth/login';
  const loginUrl=`${PROTOCOL}://${BASIC_AUTH}@${BASE_URL}${LOGIN_WS}`;
  const payload = JSON.stringify({
    login: user,
    password: pass,
  });
  const params = {
    headers: {'Content-Type': 'application/json'}
  };	
  let resp = http.post(loginUrl, payload, params);
  return resp.body;
};

const queryStudentProfile = function(student, token){
  const STUDENT_WS='/alumnos/alumno';
  const urlQuery=`${PROTOCOL}://${BASE_URL}${STUDENT_WS}/${encodeURIComponent(student)}`;
  const params= {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  };
  const resp = http.get(urlQuery, params);
  return resp.json();
}

export default function () {
  const token = login('rowlandsaunders@tropoli.com','exercitation');
  queryStudentProfile('rowlandsaunders@tropoli.com',token);
}
