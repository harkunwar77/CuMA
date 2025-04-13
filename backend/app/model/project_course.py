from sqlalchemy import Column, BigInteger, Text, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class ProjectCourse(Base):
    __tablename__ = 'project_course'

    id = Column(BigInteger, primary_key=True)
    project_id = Column(BigInteger, nullable=False)
    course_code = Column(Text, nullable=False)
    also_known_as = Column(Text)
    formerly_known_as = Column(Text)
    name = Column(Text, nullable=False)
    document_id = Column(Text)
    revision_start_date = Column(Date, nullable=False)
    latest_modified = Column(Date)
    state = Column(Text)
    parent_course_id = Column(BigInteger)
    prerequisite = Column(Text)
    postrequisite = Column(Text)
    indigenous_course = Column(Text)

    # Define relationship to link ProjectCourse to its outcomes
    outcomes = relationship("ProjectCourseOutcome", back_populates="course")


# New model for ProjectCourseOutcome
class ProjectCourseOutcome(Base):
    __tablename__ = 'project_course_outcome'

    id = Column(BigInteger, primary_key=True)
    course_id = Column(BigInteger, ForeignKey('project_course.id', ondelete='CASCADE'))
    description = Column(Text, nullable=False)
    uga_alignment = Column(Text)  # Optional, stores UGA alignment if applicable

    # Define back reference to link outcome to course
    course = relationship("ProjectCourse", back_populates="outcomes")
