import React from 'react';

import mongo from '../../assets/mongo.svg'
import postgres from '../../assets/postgres.svg';
import sql from '../../assets/sql.svg';
import laptop from '../../assets/laptop.svg';
import pc from '../../assets/pc.svg';
import loadbalancer from '../../assets/loadbalancer.svg';
import server from '../../assets/server.svg';
import phone from '../../assets/phone.svg';
import redis from '../../assets/redis.svg';


export interface ComponentsInterface {
    img: any,
    name: string
}

export const data: ComponentsInterface[] = [
    { img: mongo, name: 'MongoDB' },
    { img: postgres, name: 'Postgres' },
    { img: sql, name: 'SQL' },
    { img: laptop, name: 'Laptop' },
    { img: pc, name: 'PC' },
    { img: loadbalancer, name: 'Load Balancer' },
    { img: server, name: 'Server' },
    { img: phone, name: 'Phone' },
    { img: redis, name: 'Redis' },
];
