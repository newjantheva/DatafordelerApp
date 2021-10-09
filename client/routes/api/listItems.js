const { Router } = require('express')
const ListItem = require('../../models/ListItem')

const router = Router()

router.get('/', async (req, res) => {
    try{
        const listItems = await ListItem.find()
        if (!listItems) throw new Error('No listitems')
        const sorted = listItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newListItem = new ListItem(req.body)

    try {
        const listItem = await newListItem.save()
        if(!listItem) throw new Error('Something went wrong saving the listitem')
        res.status(200).json(listItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const response = await ListItem.findByIdAndUpdate(id, req.body)
        if(!response) throw new Error('Something went wrong')
        const updated = {...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete('/:id', async(req, res) => {
    const { id } = req.params
    try {
        const removed = await ListItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router