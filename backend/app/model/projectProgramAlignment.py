from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class ProjectProgramAlignment(Base):
    __tablename__ = 'project_program_alignments'

    id = Column(BigInteger, primary_key=True, default=None)
    program_id = Column(BigInteger, ForeignKey('project_program.id', ondelete='CASCADE'))
    legend = Column(Text)
    description = Column(Text)

    # Use a string reference for the relationship back to ProjectProgram
    program = relationship('ProjectProgram', back_populates='alignments')

    def __init__(self, program_id, legend=None, description=None, id=None):
        self.id = id
        self.program_id = program_id
        self.legend = legend
        self.description = description
