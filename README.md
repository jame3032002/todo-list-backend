# TO DO List Backend

API ของ To do list ที่ไม่ได้ใช้ database

## Quick Start

Clone Project ลงมาในเครื่อง

```sh
git clone git@github.com:jame3032002/todo-list-backend.git
```

cd ไปที่ Project

```sh
cd ./todo-list-backend
```

Install dependencies

```sh
npm install
```

### Run dev mode

```sh
npm run dev
```

### Run production mode

```sh
npm run start
```

## Base endpoint

The base endpoint http://localhost:2000 สามารถใช้เข้าถึง API endpoints ต่างๆ ตาม documents ด้านล่าง

<details>
  <summary>Get todos - ดึงข้อมูล Todos ทั้งหมด</summary>

## Get Todos

เป็น Route สำหรับดึงข้อมูล Todos ทั้งหมดมาแสดง

**URL** : `/todos`

**Method** : `GET`

# Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "todos": [
    {
      "id": 1,
      "task": "ล้างรถ",
      "status": "todo"
    },
    {
      "id": 2,
      "task": "อ่านหนังสือ",
      "status": "todo"
    },
    {
      "id": 3,
      "task": "ตีแบด",
      "status": "todo"
    }
  ]
}
```

</details>

<details>
  <summary>Get todo by id - ดึงข้อมูล Todo ด้วย id</summary>

## Get Todo by id

เป็น Route สำหรับดึงข้อมูล Todo ด้วย id

**URL** : `/todos/:id`

**Method** : `GET`

# Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "todo": {
    "id": 1,
    "task": "ล้างรถ",
    "status": "todo"
  }
}
```

# Error Response

### Not found todo

**Condition** : ถ้าหาก `id` ที่ส่งมา ไม่ถูกต้อง

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Not found todo"
}
```

</details>

<details>
  <summary>Create todo - สร้าง todo</summary>

## Create todo

เป็น Route สำหรับสร้าง todo

**URL** : `/todos`

**Method** : `POST`

**Data constraints**

```json
{
  "task": "ข้อมูลเป็น String"
}
```

**Data example**

```json
{
  "task": "ล้างรถ"
}
```

## Success Response

**Code** : `201 Created`

**Content** :

```json
{
  "success": true,
  "todo": {
    "id": 1,
    "task": "ล้างรถ",
    "status": "todo"
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าหากไม่ได้ส่ง `task` มา

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

</details>

<details>
  <summary>Delete todo - ลบ todo ด้วย id</summary>

## Delete todo

เป็น Route สำหรับ todo โดยส่ง id เข้ามาเพื่อลบ

**URL** : `/todos/:id`

**Method** : `DELETE`

## Success Response

**Code** : `204 No Content`

## Error Response

### Not found todo

**Condition** : ถ้าหาก `id` ที่ส่งมาไม่ถูกต้อง

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Not found todo to delete"
}
```

</details>

<details>
  <summary>Update todo - แก้ไข todo (สามารถแก้ไข status ได้ด้วย)</summary>

## Update todo

เป็น Route ที่เรียกเมื่อต้องการแก้ไขข้อมูล todo

**URL** : `/todos/:id`

**Method** : `PATCH`

**Data constraints**

```json
{
  "task": "ข้อมูลเป็น String",
  "status": "ข้อมูลเป็น String เป็นได้แค่ 'todo', 'doing', 'done'"
}
```

> ไม่จำเป็นต้องส่งมาทุก field ถ้าหากค่าไหนที่ไม่ได้ส่งมา ค่านั้นจะไม่ถูกอัพเดท

**Data example**

```json
{
  "task": "เล่นฟุตบอล",
  "status": "doing"
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "todo": {
    "id": 3,
    "task": "เล่นฟุตบอล",
    "status": "doing"
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าไม่ได้ส่ง `task` และ `status` ไป

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

<hr />

### Not found todo

**Condition** : ถ้าหาก `id` ที่ส่งมาไม่พบข้อมูล

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Not found todo"
}
```

</details>

<details>
  <summary>Update todo status - แก้ไข status ของ todo</summary>

## Update todo status

เป็น Route ที่เรียกเมื่อต้องการแก้ไข status ของ todo

**URL** : `/todos/:id/status`

**Method** : `PATCH`

**Data constraints**

```json
{
  "status": "ข้อมูลเป็น String เป็นได้แค่ 'todo', 'doing', 'done'"
}
```

**Data example**

```json
{
  "status": "done"
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "todo": {
    "id": 3,
    "task": "เล่นฟุตบอล",
    "status": "done"
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าไม่ได้ส่ง `status` ไป หรือ `status` ที่ส่งมาไม่ใช่ `todo`, `doing` หรือ `done`

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

<hr />

### Not found todo

**Condition** : ถ้าหาก `id` ที่ส่งมาไม่พบข้อมูล

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Not found todo"
}
```

</details>
