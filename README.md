# ElderlyCare

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/j48a217e)

## About the Project: Elder Care Website

To address the global issue of an aging population, an web-based solution is developed to help older persons

maintain their health, well-being, and active participation in society.

This projects helps elderly people to book doctor appointments based on their requirements.

![Logo](https://trainingmag.com/wp/wp-content/uploads/2021/04/4-9-21.jpg)

## Team Members

1. Puja Barathi Nagarajan
   NUID Number: 002475531

2. Pankhuri Gupta
   NUID Number: 002478905

3. Kartik Taneja
   NUID Number: 002809280

4. Dhruv Sunil Parmar
   NUID Number: 002837422

## Github Milestones and Stories tracklist

https://github.com/orgs/info-6150-spring-2024/projects/50/views/1

## API Reference

#### Get doctors based on Affordability, Patient Ratings and Reviews, Availability, Language, Location, Specialty

```http
  GET /api/search-doctors
```

| Parameter       | Type     | Description                                               |
| :-------------- | :------- | :-------------------------------------------------------- |
| `name`          | `string` | **Required**. Full Name                                   |
| `specialty`     | `string` | **Required**. Medical specialty of the doctor             |
| `language`      | `string` | **Required**. Languages spoken by the doctor              |
| `availability`  | `string` | **Required**. Availability of the doctor for appointments |
| `patientRating` | `number` | Minimum patient rating of the doctor                      |
| `affordability` | `number` | Maximum consultation fee accepted by the user             |
| `experience`    | `number` | Professional Experience of the Doctor                     |

#### Get a list of all the doctors on navigatin health consultations tab page

```http
  GET /api/listing-health-experts
```

#### Books doctor appointment based on the requirements passed by patients

```http
  POST /api/appointment/book
```

| Parameter       | Type        | Description                                                        |
| :-------------- | :---------- | :----------------------------------------------------------------- |
| `doctorId`      | `string`    | **Required**. identifier of doctor users                           |
| `patientId`     | `string`    | **Required**. identifier if patient users                          |
| `dateTime`      | `date-time` | **Required**. date-time of appointment booked                      |
| `duration`      | `number`    | **Required**. duration of the appointment in minutes               |
| `speciality`    | `string`    | **Required**. speciality of doctor for this particular appointment |
| `healthConcern` | `string`    | **Required**. health concern of the patient reported               |

#### Fetches appointment created by the filters passed

```http
  GET /api/appointment/view
```

| Parameter       | Type     | Description                                             |
| :-------------- | :------- | :------------------------------------------------------ |
| `appointmentId` | `string` | **Required**. Appointment id of the appointment created |

#### Posts Elderly info when an account registration occurs successfully

```http
  POST /api/elderly/register
```

| Parameter        | Type   | Description                                                                |
| ---------------- | ------ | -------------------------------------------------------------------------- |
| `email`          | string | **Required**. The elderly patient's email address.                         |
| `password`       | string | **Required**. The account password.                                        |
| `fullName`       | string | **Required**. The full name of the elderly patient.                        |
| `healthConcerns` | array  | **Required**. List of health concerns or problems the elderly patient has. |

##### Request Body Example:

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe",
  "healthConcerns": ["Diabetes", "Hypertension"]
}
```

#### authenticates credentials against database and redirects back to /login

```http
  POST /api/elderly/login
```

| Parameter  | Type   | Description                                        |
| ---------- | ------ | -------------------------------------------------- |
| `email`    | string | **Required**. The elderly patient's email address. |
| `password` | string | **Required**. The account password.                |

## Authors

- [@pankhuri-neu](https://github.com/pankhuri-neu)
- [@pujabarathinagarajan](https://github.com/pujabarathinagarajan)
- [@Dhruv64](https://github.com/Dhruv64)
- [@KartikeTaneja](https://github.com/KartikeTaneja)
