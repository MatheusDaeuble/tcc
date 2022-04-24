import random, time
from data import passwords, names, phones, dates, genders, courses, workloads

def current_milli_time():
  return round(time.time() * 1000)

def get_base_email():
  return f"user{current_milli_time()}"

def get_random_name():
  return names[random.randint(0,len(names) - 1)]

def get_random_password():
  return passwords[random.randint(0,len(passwords) - 1)]

def get_random_phone():
  return phones[random.randint(0,len(phones) - 1)]

def get_random_date():
  return dates[random.randint(0,len(dates) - 1)]

def get_random_gender():
  return genders[random.randint(0,len(genders) - 1)]

def get_random_course():
  return courses[random.randint(0,len(courses) - 1)]
  
def get_random_workload():
  return workloads[random.randint(0,len(workloads) - 1)]

