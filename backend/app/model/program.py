from sqlalchemy import Column, Integer, String, Date, ForeignKey, BigInteger, DateTime,Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Program(Base):
    __tablename__ = 'program'

    # id = Column(BigInteger, primary_key=True)
    # name = Column(String)
    # academic_level = Column(String)
    # faculty_id = Column(BigInteger)
    # document_id = Column(String(255))
    # latest_modified = Column(DateTime)
    # state = Column(String)
    # revision_start_date = Column(Date)  # Adding revision_start_date to align with the table changes


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

    def _init_(self, name,project_id, academic_level, faculty_id, document_id, latest_modified, state, revision_start_date=None, parent_program_id=None, id=None):
        self.name = name
        self.project_id=project_id
        self.academic_level = academic_level
        self.faculty_id = faculty_id
        self.document_id = document_id
        self.latest_modified = latest_modified
        self.state = state
        self.revision_start_date = revision_start_date
        self.id = id
        self.parent_program_id=parent_program_id

class ProgramOutcome(Base):
    __tablename__ = 'program_outcome'

    id = Column(Integer, primary_key=True)
    program_id = Column(BigInteger, ForeignKey('program.id'))
    description = Column(String)
    uga_alignment = Column(String)

    program = relationship('Program', back_populates='outcomes')

    def _init_(self, program_id, description, uga_alignment, id=None):
        self.program_id = program_id
        self.description = description
        self.uga_alignment = uga_alignment
        self.id = id

# Establishing relationship in Program class
Program.outcomes = relationship('ProgramOutcome', order_by=ProgramOutcome.id, back_populates='program')