import random
from locust import task, SequentialTaskSet
from locust.contrib.fasthttp import FastHttpUser
from util import get_random_name, get_random_password, get_random_phone, get_random_date, get_random_gender, get_base_email, get_random_course, get_random_workload
from locust.exception import RescheduleTask

base_email = get_base_email()
count = 1
users = []
courses = []

class MonolithRunner(FastHttpUser):

    # Certificates:
    @task
    def create_certificate(self):
        data = { "fullName": get_random_name() }
        self.client.post('/certificates', json=data)

    # Users:
    @task
    def create_user(self):
        global count
        global users

        count = count + 1

        user = {
            "email": f"{base_email}_{count}@gmail.com",
            "password": get_random_password(),
            "fullName": get_random_name(),
            "phone": get_random_phone(),
            "gender": get_random_gender(), 
            "birthDate": get_random_date(),
        }

        response = self.client.post("/users", json=user)
        user = response.json()

        if('id' in user):
            users.append(user)
        
    @task
    def delete_user(self):
        global users
        if (len(users)):

            user = users.pop(self.get_random_user_index())
            id = user['id']
            self.client.delete(f'/users/{id}', name='/users/delete')

    @task
    def show_user(self):
        global users
        if (len(users)):
            user = users[self.get_random_user_index()]
            id = user['id']
            self.client.get(f'/users/{id}', name='/users/show')

    @task
    def list_user(self):
        self.client.get(f'/users', name='/users/list')

    
    @task
    def update_user(self):
        global users
        if (len(users)):

            user = users[self.get_random_user_index()]
            id = user['id']

            data = {
                "fullName": get_random_name(),
                "phone": get_random_phone(),
                "gender": get_random_gender(), 
                "birthDate": get_random_date(),
            }

            self.client.put(f'/users/{id}', name='/users/update', json=data)

    @task
    def registration_user(self):
        global users
        global courses
        if (len(users) and len(courses)):

            user = users.pop(self.get_random_user_index())
            course = courses.pop(self.get_random_course_index())

            data = {
                "courseId": course['id'],
                "userId": user['id'],
            }

            self.client.post('/users/registration', name='/users/registration', json=data)

            users.append(user)
            courses.append(course)

    # Courses:
    @task
    def create_course(self):
        global courses

        course = {
            "name": get_random_course(),
            "professorName": get_random_name(),
            "workload": get_random_workload(),
            "startDate": get_random_date(),
            "endDate": get_random_date(), 
        }

        response = self.client.post("/courses", json=course)
        course = response.json()

        if('id' in course):
            courses.append(course)
        
    @task
    def delete_course(self):
        global courses
        if (len(courses)):

            course = courses.pop(self.get_random_course_index())
            id = course['id']
            self.client.delete(f'/courses/{id}', name='/courses/delete')

    @task
    def show_course(self):
        global courses
        if (len(courses)):
            course = courses[self.get_random_course_index()]
            id = course['id']
            self.client.get(f'/courses/{id}', name='/courses/show')

    @task
    def list_course(self):
        self.client.get(f'/courses', name='/courses/list')

    
    @task
    def update_course(self):
        global courses
        if (len(courses)):

            course = courses[self.get_random_course_index()]
            id = course['id']

            data = {
                "name": get_random_course(),
                "professorName": get_random_name(),
                "workload": get_random_workload(), 
                "startDate": get_random_date(),
                "endDate": get_random_date(),
            }

            self.client.put(f'/courses/{id}', name='/courses/update', json=data)

    def get_random_user_index(self):
        global users

        length = len(users)

        while (not length):
            length = len(users)

        return random.randint(0, len(users) - 1)


    def get_random_course_index(self):
        global courses

        length = len(courses)

        while (not length):
            length = len(courses)

        return random.randint(0, len(courses) - 1)

class MicroserviceRunner(FastHttpUser):

    @task
    def create_certificate(self):
        data = { "fullName": get_random_name() }
        self.client.post('-certificate-dot-unifor-tcc.rj.r.appspot.com', json=data, name='/certificates')

    @task
    def create_user(self):
        global count
        global users

        count = count + 1

        user = {
            "email": f"{base_email}_{count}@gmail.com",
            "password": get_random_password(),
            "fullName": get_random_name(),
            "phone": get_random_phone(),
            "gender": get_random_gender(), 
            "birthDate": get_random_date(),
        }

        response = self.client.post("-user-dot-unifor-tcc.rj.r.appspot.com", json=user, name='/users')
        user = response.json()

        if('id' in user):
            users.append(user)
        
    @task
    def delete_user(self):
        global users
        if (len(users)):

            user = users.pop(self.get_random_user_index())
            id = user['id']
            self.client.delete(f'-user-dot-unifor-tcc.rj.r.appspot.com/{id}', name='/users/delete')

    @task
    def show_user(self):
        global users
        if (len(users)):
            user = users[self.get_random_user_index()]
            id = user['id']
            self.client.get(f'-user-dot-unifor-tcc.rj.r.appspot.com/{id}', name='/users/show')

    @task
    def list_user(self):
        self.client.get(f'-user-dot-unifor-tcc.rj.r.appspot.com', name='/users/list')

    
    @task
    def update_user(self):
        global users
        if (len(users)):

            user = users[self.get_random_user_index()]
            id = user['id']

            data = {
                "fullName": get_random_name(),
                "phone": get_random_phone(),
                "gender": get_random_gender(), 
                "birthDate": get_random_date(),
            }

            self.client.put(f'-user-dot-unifor-tcc.rj.r.appspot.com/{id}', name='/users/update', json=data)

    @task
    def registration_user(self):
        global users
        global courses
        if (len(users) and len(courses)):

            user = users.pop(self.get_random_user_index())
            course = courses.pop(self.get_random_course_index())

            data = {
                "courseId": course['id'],
                "userId": user['id'],
            }

            self.client.post('-user-dot-unifor-tcc.rj.r.appspot.com/registration', name='/users/registration', json=data)

            users.append(user)
            courses.append(course)

    @task
    def create_course(self):
        global courses

        course = {
            "name": get_random_course(),
            "professorName": get_random_name(),
            "workload": get_random_workload(),
            "startDate": get_random_date(),
            "endDate": get_random_date(), 
        }

        response = self.client.post("-course-dot-unifor-tcc.rj.r.appspot.com", json=course, name='/courses')
        course = response.json()

        if('id' in course):
            courses.append(course)
        
    @task
    def delete_course(self):
        global courses
        if (len(courses)):

            course = courses.pop(self.get_random_course_index())
            id = course['id']
            self.client.delete(f'-course-dot-unifor-tcc.rj.r.appspot.com/{id}', name='/courses/delete')

    @task
    def show_course(self):
        global courses
        if (len(courses)):
            course = courses[self.get_random_course_index()]
            id = course['id']
            self.client.get(f'-course-dot-unifor-tcc.rj.r.appspot.com/{id}', name='/courses/show')

    @task
    def list_course(self):
        self.client.get(f'-course-dot-unifor-tcc.rj.r.appspot.com', name='/courses/list')

    
    @task
    def update_course(self):
        global courses
        if (len(courses)):

            course = courses[self.get_random_course_index()]
            id = course['id']

            data = {
                "name": get_random_course(),
                "professorName": get_random_name(),
                "workload": get_random_workload(), 
                "startDate": get_random_date(),
                "endDate": get_random_date(),
            }

            self.client.put(f'-course-dot-unifor-tcc.rj.r.appspot.com/{id}', name='/courses/update', json=data)

    def get_random_user_index(self):
        global users

        length = len(users)

        while (not length):
            length = len(users)

        return random.randint(0, len(users) - 1)


    def get_random_course_index(self):
        global courses

        length = len(courses)

        while (not length):
            length = len(courses)

        return random.randint(0, len(courses) - 1)