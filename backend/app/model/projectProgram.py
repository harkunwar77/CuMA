from sqlalchemy import Column, BigInteger, Text, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class ProjectProgram(Base):
    __tablename__ = 'project_program'

    id = Column(BigInteger, primary_key=True, default=None)
    project_id = Column(BigInteger, nullable=False)
    name = Column(Text, nullable=False)
    academic_level = Column(Text)
    faculty_id = Column(BigInteger, nullable=False)
    document_id = Column(Text)
    latest_modified = Column(Date)
    revision_start_date = Column(Date)
    state = Column(Text)
    parent_program_id = Column(BigInteger)

    # Define relationship with ProjectProgramOutcome
    outcomes = relationship('ProjectProgramOutcome', back_populates='program', cascade="all, delete-orphan")


# ProjectProgramOutcome Model
class ProjectProgramOutcome(Base):
    __tablename__ = 'project_program_outcome'

    id = Column(BigInteger, primary_key=True, default=None)
    program_id = Column(BigInteger, ForeignKey('project_program.id', ondelete='CASCADE'))
    description = Column(Text, nullable=False)
    uga_alignment = Column(Text)

    # Back-reference to ProjectProgram
    program = relationship('ProjectProgram', back_populates='outcomes')