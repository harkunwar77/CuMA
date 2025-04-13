import os
import subprocess

# Replace these variables with your PostgreSQL credentials and database name
PG_HOST = 'localhost'
PG_PORT = '5432'
PG_USER = 'postgres'
PG_PASSWORD = 'jashan'
PG_DB = 'cuma'

# Replace this with the path where you want to store the backups
BACKUP_DIR = os.getcwd()

# Create the backup directory if it doesn't exist
os.makedirs(BACKUP_DIR, exist_ok=True)

def get_table_names():
    print("Extrating all the tables...")
    cmd = f'psql -U {PG_USER} -h {PG_HOST} -p {PG_PORT} -d {PG_DB} -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';"'
    output = subprocess.check_output(cmd, shell=True, text=True)
    return output.strip().splitlines()

def run_backup():
    table_names = get_table_names()
    for table_name in table_names:
        table_name = table_name.strip()
        backup_file = os.path.join(BACKUP_DIR, f"{table_name}.sql")
        backup_command = f"pg_dump -U {PG_USER} -d {PG_DB} -t {table_name} -f {backup_file}"
        print("Starting for :-"+backup_command)
        subprocess.run(backup_command, shell=True)
        print(f"Backup of table {table_name} saved to {backup_file}")

if __name__ == "__main__":
    run_backup()

#usage : run in command prompt update the databse name and user name before running 