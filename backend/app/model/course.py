from sqlalchemy import Column, Integer, String, Date,Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, nullable=False)
    course_code = Column(Text, nullable=False)
    also_known_as = Column(Text)
    formerly_known_as = Column(Text)
    name = Column(Text, nullable=False)
    document_id = Column(Text)
    revision_start_date = Column(Date, nullable=False)
    latest_modified = Column(Date)
    state = Column(Text)
    parent_course_id = Column(Integer)
    prerequisite = Column(Text)
    postrequisite = Column(Text)
    indigenous_course = Column(Text)

    def __init__(self, project_id, course_code, also_known_as=None, formerly_known_as=None, 
                 name=None, document_id=None, revision_start_date=None, latest_modified=None,
                 state=None, parent_course_id=None, prerequisite=None, postrequisite=None, 
                 indigenous_course=None, id=None):
        self.project_id = project_id
        self.course_code = course_code
        self.also_known_as = also_known_as
        self.formerly_known_as = formerly_known_as
        self.name = name
        self.document_id = document_id
        self.revision_start_date = revision_start_date
        self.latest_modified = latest_modified
        self.state = state
        self.id = id
        self.parent_course_id = parent_course_id
        self.prerequisite = prerequisite
        self.postrequisite = postrequisite
        self.indigenous_course = indigenous_course

  