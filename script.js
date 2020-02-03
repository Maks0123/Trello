let noteIdCounter = 8;
let columnIdCounter = 4;
let draggedNote = null;

document
    .querySelectorAll('.column')
    .forEach(columnProcess)

    document
        .querySelector('[data-action-addColumn]')
        .addEventListener('click', function(event){
            const columnElement = document.createElement('div')
            columnElement.classList.add('column')
            columnElement.setAttribute('draggale', 'true')
            columnElement.setAttribute('data-column-id', columnIdCounter)

            columnElement.innerHTML = 
            `
            <p class="column-header">В плане</p>
					<div data-notes>
						
					</div>
					<p class="column-footer">
						<span data-action-addNote class="action">+ Добавить карточку</span>
					</p>
            `
            columnIdCounter++

            document.querySelector('.columns').append(columnElement)
            columnProcess(columnElement)

        })

document
			.querySelectorAll('.note')
      .forEach(noteProcess)


function columnProcess(columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
    spanAction_addNote.addEventListener('click', function(event){
        const noteElement = document.createElement('div')
        noteElement.classList.add('note')
        noteElement.setAttribute('draggable', 'true')
        noteElement.setAttribute('data-note-id', noteIdCounter)

        noteIdCounter++
        columnElement.querySelector('[data-notes]').append(noteElement)
        noteProcess(noteElement)

        noteElement.setAttribute('contenteditable', true)
        noteElement.focus()
       })
       
       const headerElement = columnElement.querySelector(['.column-header'])
       
       headerElement.addEventListener('dblclick', function(event){
       		headerElement.setAttribute('contenteditable', true)
          headerElement.focus()
       })
       
      headerElement.addEventListener('blur', function(event){
        headerElement.removeAttribute('contenteditable', true)
       })

       columnElement.addEventListener('dragover', function(event){
        event.preventDefault()
      })
       
      columnElement.addEventListener('drop', function(event){
        if (draggedNote) {
           // return columnElement.querySelector('[data-notes]').append(draggedNote)
           return columnElement.append(draggedNote)
        }
      })

    }
    
    
    
function noteProcess(noteElement){
      		noteElement.addEventListener('dblclick', function(event){
            noteElement.setAttribute('contenteditable', 'true')
            noteElement.removeAttribute('draggable')
            noteElement.closest('.column').removeAttribute('draggable')
            noteElement.focus()
          })
          noteElement.addEventListener('blur', function(event){
              noteElement.removeAttribute('contenteditable', 'false')
              noteElement.setAttribute('draggable')
              noteElement.closest('.column').setAttribute('draggable')
              
              if(!noteElement.textContent.trim().length){
                noteElement.remove()
              }
          })
          
          
noteElement.addEventListener('dragstart', dragstart_noteHandler)
noteElement.addEventListener('dragend', dragend_noteHandler)
noteElement.addEventListener('dragenter', dragenter_noteHandler)
noteElement.addEventListener('dragover', dragover_noteHandler)
noteElement.addEventListener('dragleave', dragleave_noteHandler)
noteElement.addEventListener('drop', drop_noteHandler)

      }
      
      
      
function dragstart_noteHandler(event){
   let draggedNote = this
   this.classList.add('dragged')
   
   event.stopPropagation()
}
function dragend_noteHandler(event){
      draggedNote = null
      this.classList.remove('dragged')

   document
        .querySelectorAll('.note')
        .forEach(x => x.classList.remove('under'))   
}
function dragenter_noteHandler(event){
  if (this === draggedNote){
    return
  }
  this.classList.add('under')
}
function dragover_noteHandler(event){
    event.preventDefault()

      if (this === draggedNote){
    return
  }
}
function dragleave_noteHandler(event){
    if (this === draggedNote){
    return
  }
  this.classList.remove('under')
}
function drop_noteHandler(event){
 /* event.stopPropagation()
      if (this === draggedNote){
    return
  }

  if (this.perentElement === draggedNote.perentElement){
  }
   else {
 this.perentElement.insertBefore(draggedNote, this)
}
)/
 /* if (this.perentElement === draggedNote.perentElement){
       const note = Array.from(this.parentElement.querySelectorAll('.note'))
       const indexA = note.indexOf(this)
       const indexB = note.indexOf(draggedNote)

       if (indexA < indexB){
        this.perentElement.insertBefore(draggedNote, this)
       }
       else {
         this.parentElement.insertBefore(draggedNote, this.nextElementSibling)
       }
  }
  else {
    this.perentElement.insertBefore(draggedNote, this)
  }
  */

  console.log(this)
  console.log(draggedNote)
}    
    
    
    
    
    